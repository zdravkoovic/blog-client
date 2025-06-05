import fs from 'node:fs/promises'
import express from 'express'
import cookieParser from 'cookie-parser';
import axios from 'axios';

// Constants
const isProduction = false;
const port = 5173
const base = '/'

// Cached production assets
const templateHtml = isProduction
  ? await fs.readFile('./dist/client/index.html', 'utf-8')
  : ''

// Create http server
const app = express()

// Add Vite or respective production middlewares
/** @type {import('vite').ViteDevServer | undefined} */
let vite
if (!isProduction) {
  const { createServer } = await import('vite')
  vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
    base,
  })
  app.use(vite.middlewares)
} else {
  const compression = (await import('compression')).default
  const sirv = (await import('sirv')).default
  app.use(compression())
  app.use(base, sirv('./dist/client', { extensions: [] }))
}

function authMiddleware(req, res, next){
  const token = req.cookies.access_token;
  const isLoading = req.path === '/login';

  if(!token && !isLoading){
    return res.redirect('/login');
  }

  // if(token && isLoading){
  //   return res.redirect('/');
  // }

  next();
}

app.use(cookieParser());

app.use(express.json());

app.use(authMiddleware);

app.post('/login', async function(req, res){
  const data = await axios.post('http://localhost:8000/api/v1/auth/login', {
    email: req.body.email,
    password: req.body.password
  });

  let status = data.data.status;
  let user = data.data.data.user;
  let token = data.data.data.token;

  console.log(status);
  
  if(status === 200)
  {
    res.cookie('access_token', token, {
      httpOnly: true,
      sameSite: 'strict',
      maxAge: 1000*60*60
    });

    res.cookie('id_token', JSON.stringify(user), {
      sameSite: 'strict',
      maxAge: 1000*60*60
    })

    return res.redirect('/');
  }
});

// Serve HTML
app.use('*all', async (req, res) => {
  try {
    const url = req.originalUrl.replace(base, '')

    const { getAllBlogs } = await vite.ssrLoadModule('/src/Services/BlogService.ts');
    const blogs = await getAllBlogs();

    let user = null;
    
    const id_token = req.cookies.id_token;
    if(id_token){
            
    }

    /** @type {string} */
    let template
    /** @type {import('./src/entry-server.tsx').render} */
    let render
    if (!isProduction) {
      // Always read fresh template in development
      template = await fs.readFile('./index.html', 'utf-8')
      template = await vite.transformIndexHtml(url, template)
      render = (await vite.ssrLoadModule('/src/entry-server.tsx')).render
    } else {
      template = templateHtml
      render = (await import('./dist/server/entry-server.js')).render
    }

    const rendered = await render(url, blogs.data)

    const initialDataScript = 
      `<script>
        window.__INITIAL_BLOGS__ = ${JSON.stringify(blogs.data)};
      </script>`

    const html = template
      .replace(`<!--app-head-->`, rendered.head ?? '')
      .replace(`<!--ssr-outlet-->`, rendered.html ?? '')
      .replace(`<!--initial-data-->`, initialDataScript)

    res.status(200).set({ 'Content-Type': 'text/html' }).send(html)
  } catch (e) {
    vite?.ssrFixStacktrace(e)
    console.log(e.stack)
    res.status(500).end(e.stack)
  }
})

// Start http server
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`)
})