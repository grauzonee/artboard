export class FormError {
    fields?: string[];
    messages: string[];
    constructor(messages: string[], fields?: string[]) {
        this.messages = messages;
        this.fields = fields;
    }
}
