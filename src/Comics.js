import React, {Component} from 'react';

class Comics extends Component {
  
  constructor(){
   super();
    
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
    
    
  }

  componentDidMount(){
    fetch("https://comicvine.gamespot.com/api/issues/?api_key=1ed16e818e186b7686584537a237ef602d3e6ebd&format=json&sort=cover_date:asc&filter=volume:106694")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result.results
          });    
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        //https://reactjs.org/docs/faq-ajax.html
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }
  
  htmlDecode = content => {
    let e = document.createElement('div');
    e.innerHTML = content;
    return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
  }
  
  render(){
    return(
      <div className="items-container">
        <ul>
        {this.state.items.map(item => (
            <li key={item.id}>
              <div className="image"><img src={item.image.thumb_url} /></div>
              <div className="info">
                
                <p>Issue number: {item.issue_number}</p>
                <p dangerouslySetInnerHTML={ {__html: htmlDecode(item.description)} } />
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default Comics;