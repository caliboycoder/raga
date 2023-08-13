import { baseURL, sub } from '$lib/info'
import { proxify } from '$lib/utils'
import { json } from '@sveltejs/kit';

export async function GET({ url }) {
    const query = url.searchParams.get('q');
    const index = url.searchParams.get('index') || 1;
    const resp = await fetch(baseURL + sub.index + index + sub.search.songs + query);
    const data = await resp.json();
    const results = await data.results;

    await results.forEach((res) => {
		res.image = proxify(res.image, "media")
	})

    return json({
        'results': results
    });
}