import { renderToString } from 'react-dom/server'
import App from './App'
import type { Blog } from './Services/BlogService';
import { matchRoutes, renderMatches, StaticRouter, type RouteObject } from 'react-router-dom';
import { BlogContext } from './Context/blogContext';
import { routeDefinitions } from './Routes/Routes';


interface RenderResult {
    head?: string;
    html: string;
}

/**
 * @param {string} _url
 */
export async function render(_url: string, blogs: Blog[]): Promise<RenderResult> {
    
  _url = '/' + _url;
  const matches = matchRoutes(routeDefinitions as RouteObject[], _url, '/');

  if(matches === null) 
  {
    return { html: '<h1>404 Not Found</h1>'}
  }

  const html = renderToString(
<BlogContext.Provider value={blogs}>
    <StaticRouter location={_url} basename='/'>
      {renderMatches(matches)}
    </StaticRouter>
    </BlogContext.Provider>,
  )
  return { 
        head: '',
        html: html
   }
}