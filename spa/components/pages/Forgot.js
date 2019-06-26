export default () => `
<div id="container">
<div id ="err"></div>
        <form id = 'forgot'>
            <div>
                <label>username:
                    <input type="text" id = "username" name="username" autofocus placeholder="username"></input>
                </label>
            </div>
            <div>
                <label class="email">email: 
                        <input type="email" name="email" id="email" placeholder="email"></input>
                </label>
            </div>
            <input class="center block" type="submit" value="Send Password"  >
        </form>
        
    </div>
`;