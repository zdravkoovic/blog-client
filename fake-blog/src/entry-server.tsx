import { renderToString } from 'react-dom/server'
import { matchRoutes, renderMatches, StaticRouter, type RouteObject } from 'react-router-dom';
import { routeDefinitions } from './routes/Routes';
import { type User } from './models/User';
import { UserContext } from './Context/userContext';
import type { Category } from './services/CategoryService';
import { CategoryContext } from './context/categoryContext';
import { dehydrate, HydrationBoundary, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { getBlogsByCategory } from './features/blog/api/blogAPI';


interface RenderResult {
    head?: string;
    html: string;
    dehydratedState?: any;
}

/**
 * @param {string} _url
 */
export async function render(_url: string, categories: Category[], user: User, access_token: string): Promise<RenderResult> {

  const queryClient = new QueryClient();

  const allCategories: Category = { id: -1, slug: 'all', name: 'All categories' };

  const fullCategories = [allCategories, ...categories];

  await Promise.all(
    fullCategories.map(category => {
      return queryClient.prefetchInfiniteQuery({
        queryKey: ['blogs', category.slug, user?.id],
        queryFn: async ({ pageParam = 1 }) => {
          const result = await getBlogsByCategory(category.id, pageParam, access_token);
          if (!result) throw new Error('Failed to fetch blogs by category');
          return result;
        },
        initialPageParam: 1,
        getNextPageParam: (lastPage: any) => {
          if (lastPage.meta.current_page < lastPage.meta.last_page) {
            return lastPage.meta.current_page + 1;
          }
          return undefined;
        },
      })
    })
  )

  const dehydratedState = dehydrate(queryClient);

  _url = '/' + _url;
  const matches = matchRoutes(routeDefinitions as RouteObject[], _url, '/');

  if(matches === null) 
  {
    return { html: '<h1>404 Not Found</h1>'}
  }

  const html = renderToString(
    <UserContext.Provider value={user}>
      <CategoryContext.Provider value={categories}>
        <QueryClientProvider client={queryClient}>
          <HydrationBoundary state={dehydratedState}>
            <StaticRouter location={_url} basename='/'>
              {renderMatches(matches)}
            </StaticRouter>
          </HydrationBoundary>
        </QueryClientProvider>
      </CategoryContext.Provider>
  </UserContext.Provider>,
  )
  return { 
      head: '',
      html: html,
      dehydratedState
   }
}