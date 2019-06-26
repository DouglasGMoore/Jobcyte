export default (state) => `
${state.title}
<div id="container">
        <form  id ='register'>
            <div>
                <label>First Name:
                    <input type="text" id="create_first_name" autofocus placeholder="First Name">
                </label>
            </div>
            <div>
                <label>Last Name:
                    <input type="text"  id="create_last_name" placeholder="Last Name">
                </label>
            </div>
            <div>
                <label>Username:
                    <input type="text"  id="usrName" placeholder="Username">
                </label>
            </div>
            <div>
                <label class="email">email: 
                        <input type="email" name="create_email" id="email" placeholder="email">
                </label>
            </div>
            <div>
                <label class= "pass" >password: 
                        <input type="password"  id="password" placeholder="password">
                </label>
                
            </div>
            <div>
                <label class= "pass" >password: 
                    <input type="password" name="password_match" id="password_match" placeholder="retype password">
                </label>
            </div>
            <input class="center block" type="submit" value="Register"  >
        </form>
       
    </div>
`;