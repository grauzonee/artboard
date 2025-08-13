export type PostFilterData = {
    createdAtFrom: string | null;
    createdAtTill: string | null;
    materials: string[] | null;
    author: string | null;
    limit: string | null;
    sortByDesc: string | null;
}

export class PostFilter {
    createdAtFrom?: string;
    createdAtTill?: string;
    materials?: string[];
    author?: string;
    sortByDesc?: string;
    limit: string;
    constructor(data: PostFilterData) {
        this.limit = data.limit ?? '10';
        if (data.author) {
            this.author = data.author;
        }
        if (data.createdAtTill) {
            this.createdAtTill = data.createdAtTill;
        }
        if (data.createdAtFrom) {
            this.createdAtFrom = data.createdAtFrom;
        }
        if (data.materials) {
            this.materials = data.materials;
        }
        if (data.sortByDesc) {
            this.sortByDesc = data.sortByDesc;
        }
    }

    toURLSearchParams(): URLSearchParams {
        const params = new URLSearchParams();

        if (this.sortByDesc) {
            params.append('sortByDesc', this.sortByDesc);
        }
        if (this.limit) {
            params.append('limit', this.limit);
        }
        if (this.author) {
            params.append('author', this.author);
        }
        if (this.createdAtFrom) {
            params.append('createdAtFrom', this.createdAtFrom);
        }
        if (this.createdAtTill) {
            params.append('createdAtTill', this.createdAtTill);
        }
        if (this.materials) {
            this.materials.forEach(material => params.append('materials', material));
        }

        return params;
    }


}
