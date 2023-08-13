import { baseURL, sub } from '$lib/info'
import { proxify } from '$lib/utils'
import { json } from '@sveltejs/kit';

export async function GET({ url }) {
    const id = url.searchParams.get('id');
    const resp = await fetch(baseURL + sub.albumDetails + id);
    const data = await resp.json();

    data.image = proxify(data.image, "media") 

    await data.list.forEach((res) => {
        res.image = proxify(res.image, "media") 
	})

    return json(data);
}