

function buildNavHTML(stateLinks){
    return stateLinks
        .map(
            (link) =>
                `<li><a href="/${link.text.toLowerCase()}" data-navigo>${link.text}</a></li>`
        )
        .join(' ');
}

export default  (state) => `
<div id="container2">
<div id = "err" class ="center red"></div>
        <form id="login">
            <div>
                <label>username: 
                    <input type="text" name="usrName" id="usrName" autofocus placeholder="username">
                </label>
            </div>
            <div>
                <label class= "pass" >password: 
                        <input type="password" name="password" id="password" placeholder="password">
                </label>
            </div>
         <div>   
            <input class="center block loginbtn" type="submit" value="Sign in" >
        </div>
        </form>
        <div class = "center">
            <ul><h2>
            ${buildNavHTML(state.links.secondary)}
            </h2><ul>
        </div>    
    </div>
    
`;

