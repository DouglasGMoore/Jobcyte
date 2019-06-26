function buildNavHTML(stateLinks){
    return stateLinks
        .map(
            (link) =>
                `<li><a href="/${link.text.toLowerCase()}" data-navigo>${link.text}</a></li>`
        )
        .join(' ');
}

export default (state) => `
  <nav>
  
  <ul>
  <h2>
    ${buildNavHTML(state.links.primary)}
  </h2>
  </ul>
  </nav>
`;

