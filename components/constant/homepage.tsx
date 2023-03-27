export const syntaxFunction = {
  data: `function isBalancedParentheses(parentheses: string) { <br/>
  <div id="content__syntax">
    const stack = []; <br/>
    for (let i = 0; i < parentheses.length; i++) { <br/>
      <div id="content__syntax">
        const c = parentheses.charAt(i); <br/>
        if (c === '(') { <br/>
          <div id="content__syntax">stack.push(c); <br/></div>
        } else if (c === ')') { <br/>
          <div id="content__syntax">
            if (stack.length === 0) { <br/>
              <div id="content__syntax">return false; <br/></div>
            } <br/>
          </div>
          <div id="content__syntax">stack.pop(); <br/></div>
        } <br/>
      </div>
    } <br/>
    return stack.length === 0; <br/>
  </div>
}`,
};
