export const CommonLocators = {
    TITLE: "title",
    DESCRIPTION: "description",
    CLOSE_BUTTON: "close-button",
    PROGRESS_BAR: "progress-bar",

    ERROR_LABEL: "error-label",
}

export class IDLocatorBuilder {
    private prefix: string;
    private suffix: string;

    constructor(prefix: string = '', suffix: string = '') {
        this.prefix = prefix;
        this.suffix = suffix;
    }

    /**
     * Set a prefix for the ID.
     * @param prefix - The prefix to be added to the ID.
     * @returns The current instance for method chaining.
     */
    setPrefix(prefix: string): this {
        this.prefix = prefix;
        return this;
    }

    /**
     * Set a suffix for the ID.
     * @param suffix - The suffix to be added to the ID.
     * @returns The current instance for method chaining.
     */
    setSuffix(suffix: string): this {
        this.suffix = suffix;
        return this;
    }

    /**
     * Generate a new unique ID for a specific UI element type.
     * @param elementType - The type of UI element (e.g., 'dialog', 'field', 'button').
     * @returns A unique ID string.
     */
    generateLocator(elementType: string): string {
        return `${this.prefix && `${this.prefix}-`}${elementType}${this.suffix && `-${this.suffix}`}-id`;
    }
}

export const s: string[] = [];