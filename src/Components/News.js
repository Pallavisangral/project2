import React, { Component } from "react";
import NewsItem from "./NewsItem";

export class News extends Component {
	
  constructor(){
    super();
    console.log("hello i am a constructor from news component ");
    this.state={
      articles:[],
      loading:false,
      page:1
      
    }
  }
  async componentDidMount(){
    console.log("cdm");
    let url="https://newsapi.org/v2/top-headlines?country=in&apiKey=a1eadc5544984df19cf4221cad1d9f26&page=1&pageSize=20";
    let data= await fetch(url);
    let parsedData= await data.json()
    console.log(parsedData);
    this.setState({articles:parsedData.articles,totalArticles:parsedData.totalResults})
  }
  handlePrevClick=async()=>{
    let url=`https://newsapi.org/v2/top-headlines?country=in&apiKey=a1eadc5544984df19cf4221cad1d9f26&page=${this.state.page -1}&pageSize=20`;
    let data= await fetch(url);
    let parsedData= await data.json()
    console.log(parsedData);
    
    this.setState({
    page:this.state.page-1,
    articles:parsedData.articles
  })
  }
  handleNextClick=async()=>{
    if(this.state.page+1 > Math.ceil(this.state.totalResults/20)){

    }
    else{
    
    let url=`https://newsapi.org/v2/top-headlines?country=in&apiKey=a1eadc5544984df19cf4221cad1d9f26&page=${this.state.page +1}&pageSize=20`;
    let data= await fetch(url);
    let parsedData= await data.json();
    console.log(parsedData);
    
    this.setState({
    page:this.state.page+1,
    articles:parsedData.articles
  })

  }
  }
	render() {
   console.log("render")
		return (
      
			<div className="container my-3">
        <h1 className = "text-center">Indian Express- Latest News</h1>
				
				<div className="row">
					{this.state.articles.map((element)=>{
					   return <div className="col-md-4" key={element.url}>
						    <NewsItem
                
							    title={element.title?element.title:""}
							    description={element.description?element.description:""}
							    imageUrl={element.urlToImage}
							    newsUrl={element.url}
						    />
					   </div>
           })}
				</div>
        <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark "onclick={this.handlePrevClick}>&larr; Previous </button>
        <button type="button" className="btn btn-dark "onClick={this.handleNextClick}> Next &rarr; </button>
        </div>
			</div>
		)
	}
}

export default News;
