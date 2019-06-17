export default () => `
<div id="container">
Create a Meeting
        <form  id ='create'>
    <div>
        <label>Meeting Title:
            <input type="text" id="title" autofocus placeholder="Title">
        </label>
    </div>
    <div>
        <label>Meeting Topic:
            <input type="text"  id="topic" placeholder="Topic">
        </label>
    </div>
    
    <div>
        <label>Date:
            <input type="date"  id="date">
        </label>
    </div>
    <div>
        <label class="time">Time: 
                <input type="time" name="time" id="time">
        </label>
    </div>
    <div>
        <label class= "notes" >Notes: 
            <input type="text-area" name="notes" id="notes" placeholder="Notes">
        </label>
    </div>
    <div>
    <label class= "location" >Location: 
        <input type="text-area" name="notes" id="location" placeholder="Location">
    </label>
</div>
   
        <input class="center block" type="submit" value="Create" >
</form>

</div>
</div>
`;

{/* <div>
<label class= "pass" >Documents url: 
    <input type="docs" name="docs" id="notes" placeholder="Document link url">

</div> */}