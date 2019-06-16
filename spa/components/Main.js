import * as pages from './pages';


export default (state) => {
    return `
    <div id = 'content'>
    ${pages[state.pageContent](state)}
</div>
`
    ;
};