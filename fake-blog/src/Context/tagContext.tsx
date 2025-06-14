import React, { createContext, useEffect, useState } from "react";
import { getAllTags, type Tag } from "../Services/TagService";
import { handleError } from "../Helpers/ErrorHandler";

type TagContextType = {
    tags: Tag[] | null;
};

type Props = { children: React.ReactNode };

const TagContext = createContext<TagContextType>({} as TagContextType);

export const TagProvider = ({children}: Props) => {
    const [tags, setTags] = useState<Tag[] | null>([]);

    useEffect(() => {
        const load = async () => {
            try {
                getAllTags().then((res) => {
                    if(res){
                        setTags(res);
                    }
                });
            } catch (error) {
                handleError(error);
            }
        }

        if(tags?.length === 0) {
            load();
        }

    }, [])

    return (
        <TagContext.Provider value={{ tags }}>
            {children}
        </TagContext.Provider>
    )
}

export const tagContext = () => React.useContext(TagContext);