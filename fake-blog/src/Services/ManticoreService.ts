import axios from "@/components/axios";

export interface AutocompleteData {
    users: { name: string }[];
    blogs: string[];
}

export async function autocomplete(query: string): Promise<AutocompleteData | undefined> {
    const data = await axios.get(`/api/v1/manticore/autocomplete/?query=${encodeURIComponent(query)}`);
    
    if (data.status === 200) {
        return data.data.data;
    } else {
        console.error("Autocomplete request failed:", data);
        return undefined;
    }
}
