export type BaseFilterData = {
    createdAtFrom: string | null;
    createdAtTill: string | null;
    limit: string | null;
    sortByDesc: string | null;
}

export type AuthorFilterData = {
    author: string | null;
}

export class BaseFilter<T extends BaseFilterData> {
    data: T;

    constructor(data: T) {
        this.data = data;
    }

    toURLSearchParams(): URLSearchParams {
        const params = new URLSearchParams();
        Object.entries(this.data).forEach(([key, value]) => {
            if (value != null) {
                if (Array.isArray(value)) {
                    value.forEach(v => params.append(key, v));
                } else {
                    params.append(key, value);
                }
            }
        });
        return params;
    }
}
