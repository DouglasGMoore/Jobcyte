export default () => `
<div id="container">
        <form action="/user_create" method="POST">
            <div>
                <label>username:
                    <input type="text" name="create_first_name" autofocus placeholder="First Name"></input>
                </label>
            </div>
            <div>
                <label class="email">email: 
                        <input type="email" name="create_email" id="email" placeholder="email"></input>
                </label>
            </div>
            
        </form>
        <button>Send Password</button>
    </div>
`;