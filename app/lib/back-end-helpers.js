import constants from "./constants";
class BackEndHelpers{
    getSixMinute() {
        return Date.now() + 1 * 60 * 1000;
    }

    getTwentyFourHours() {
        return Date.now() + 24 * 3600 * 1000;
    }
    isValidCodeSnippet(code) {
        const detectVariablePattern = /\b\w+\s*=\s*.+/g;
        const codeSnippetPattern = /(?:function|def|class|public|private|let|var|const)[\s\S]*?(?:{|=>|\(|\)|{|}|;|\n|$)/;
        // Check if the code matches any of the patterns
        const isCode = codeSnippetPattern.test(code);
        const isVariable = detectVariablePattern.test(code);
        // Print the results
        if (isVariable || isCode) {
            return true;
        }
        return false;
    }
    isValidChoice(choice) {
        if (choice === constants.ANALYZE
            || choice === constants.OPTIMIZE) {
            return true;
        }
        return false;
    }
    isValidateTokenLimit(text, limit) {
        //1,500 words ~= 2048 tokens
        //23682 word == 10,004 tokens
        // Implement a token counting logic here
        /**P
                 * Tokens 10,019 Characters 17745
         */
        const tokens = this.countTokens(text); // Replace with your token counting function
        return tokens > limit;
    }
    countTokens(text) {
        return text && text.length;
    }

    
}
export default new BackEndHelpers();
