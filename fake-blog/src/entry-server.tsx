import { renderToString } from 'react-dom/server'
import { matchRoutes, renderMatches, StaticRouter, type RouteObject } from 'react-router-dom';
import { routeDefinitions } from './Routes/Routes';
import type { User } from './Models/User';
import { UserContext } from './Context/userContext';
import type { Category } from './Services/CategoryService';
import { CategoryContext } from './Context/categoryContext';


interface RenderResult {
    head?: string;
    html: string;
}

/**
 * @param {string} _url
 */
export async function render(_url: string, categories: Category[], user: User): Promise<RenderResult> {
    
  _url = '/' + _url;
  const matches = matchRoutes(routeDefinitions as RouteObject[], _url, '/');

  if(matches === null) 
  {
    return { html: '<h1>404 Not Found</h1>'}
  }

  const html = renderToString(
    <UserContext.Provider value={user}>
      <CategoryContext.Provider value={categories}>
        <StaticRouter location={_url} basename='/'>
          {renderMatches(matches)}
        </StaticRouter>
      </CategoryContext.Provider>
  </UserContext.Provider>,
  )
  return { 
        head: '',
        html: html
   }
}