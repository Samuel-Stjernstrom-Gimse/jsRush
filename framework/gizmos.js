class Gizmos  {
    unHackify(htmlDirty) {
        if (typeof htmlDirty !== 'string') {
            return String(htmlDirty);
        }

        // Step 1: Remove <script> tags
        let cleanedHtml = htmlDirty.replace(/<script[^>]*>([\S\s]*?)<\/script>/g, '');

        // Step 2: Remove inline event handlers (e.g., onclick, onload, etc.)
        cleanedHtml = cleanedHtml.replace(/<([a-z]+)([^>]*)\s(on\w+\s*=\s*["'][^"']*["'])/gi, '<$1$2');

        // Step 3: Escape HTML special characters to prevent XSS
        cleanedHtml = cleanedHtml.replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;')
            .replace(/\//g, '&#47;');

        // Step 4: Remove common SQL injection patterns
        cleanedHtml = cleanedHtml.replace(/(\b(SELECT|UPDATE|DELETE|INSERT|DROP|ALTER|CREATE|TRUNCATE|MERGE|--|\*|FROM|WHERE|AND|OR|UNION|LIKE|HAVING|ORDER|GROUP|BY|TABLE|DATABASE)\b)/gi, '');

        // Step 5: Use a temporary DOM element to extract the text content (removes all other tags)
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = cleanedHtml;

        // Return the text content (which is now free of HTML tags, dangerous content, and SQL patterns)
        return tempDiv.textContent || tempDiv.innerText || "";
    }
}

export default Gizmos ;