'use strict';

const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  tagCloudLink:Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML)
};

function titleClickHandler(event){
  event.preventDefault();
  const clickedElement = this;
  //console.log('Link was clicked!');


  /* [DONE] remove class 'active' from all article links  */

  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }

  /* [DONE] add class 'active' to the clicked link */


  const activeLink = this;
  activeLink.classList.add('active');


  /* [DONE] get 'href' attribute from the clicked link */

  const articleSelector = clickedElement.getAttribute('href');
  //console.log(articleSelector);

  /* find the correct article using the selector (value of 'href' attribute) */

  const targetArticle = document.querySelector(articleSelector);
  //console.log(targetArticle);

  
  /*  [DONE] remove class 'active' from all articles */

  const activeArticles = document.querySelectorAll('.post');

  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }

  /* add class 'active' to the correct article */  
  
  targetArticle.classList.add('active');

}  


  

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optTagLinksSelector = '.tags',
  optAuthorsSelector = '.post-author',
  optTagListSelector = '.tags .list',
  optCloudClassCount = 5,
  optCloudClassPrefix = 'tag-size-',
  optAuthorsListSelector = '.list .authors';

function generateTitleLinks(customSelector = '') {

  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML='';

  /* for each article */

  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  let html = '';
  for (let article of articles){

    /* get the article id */

    const articleId = article.getAttribute('id');

    /* find the title element */

    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* get the title from the title element */

    /* create HTML of the link */

    const linkHTMLData = {id: articleId, title: articleTitle};
    const linkHTML = templates.articleLink(linkHTMLData);
    //console.log(linkHTML);

    /* insert link into titleList */

    html = html + linkHTML;
    //console.log(html);

  }

  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');
  //console.log(links);

  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }

}
  
generateTitleLinks();

function calculateTagsParams(tags){
  const params =
  {max: 0,
  min: 999999};
    for (let tag in tags){
      params.max = tags[tag] > params.max ? tags[tag] : params.max;
      params.min = tags[tag] < params.min ? tags[tag] : params.min;
      console.log(tag + ' is used ' + tags[tag] + ' times');
    }
  return params;
}

function calculateTagClass(count, params){
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  console.log('normalized: ', normalizedMax, normalizedCount);
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );
  return optCloudClassPrefix, classNumber;

}

function generateTags(){
  /* creating variable with an empty object */
  let allTags = {};
  
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);

  /* START LOOP: for every article: */
  for (let article of articles){

    /* find tags wrapper */
    const tagList = article.querySelector(optArticleTagsSelector);
  

    /* make html variable with empty string */
    let html = '';

    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    console.log(articleTags);

    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    //console.log(articleTagsArray);

    /* START LOOP: for each tag */
    for(let tag of articleTagsArray){
     // console.log(tag);

      /* generate HTML of the link */
      const linkHTMLData = {id: 'tag-' + tag, title:tag};
      const linkHTML = templates.articleLink(linkHTMLData);

      /* add generated code to html variable */
      html += linkHTML;
     // console.log(html);

       /* check if this link is NOT already in allTags */
       if (!allTags.hasOwnProperty(tag)){
        /* add generated code to allTags object */
       allTags[tag] =1;
       } else {
         allTags[tag]++;
       }

    /* END LOOP: for each tag */
    }

    /* insert HTML of all the links into the tags wrapper */
    tagList.innerHTML = html;

  /* END LOOP: for every article: */
  }
    /* find list of tags in right column */
    const tagList = document.querySelector('.tags');

    const tagsParams = calculateTagsParams(allTags);
    console.log('tagsParams: ', tagsParams);

   /* create variable for all link HTML code */
   let allTagsData = {tags:[]};

   /* START LOOP: for each tag in allTags: */
   for (let tag in allTags){
   /* generate code of a link and add it to allTagsHTML */
   const tagLinkHTML = '<li class="'+ optCloudClassPrefix + calculateTagClass(allTags[tag], tagsParams) + '">' + tag + '</li>';
   console.log('tagLinkHTML = ', tagLinkHTML);

   allTagsData.tags.push({
    tag: tag,
    count: allTags[tag],
    className: calculateTagClass(allTags[tag], tagsParams)
  });
   }

   tagList.innerHTML = templates.tagCloudLink(allTagsData);
   console.log(allTagsData);
}

function tagClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  //console.log(href);

  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  //console.log(tag);

  /* find all tag links with class active */
  const tagLinks = document.querySelectorAll('a[href="' + href + '"]');

  /* START LOOP: for each active tag link */
  for(let tagLink of tagLinks){

    /* remove class active */
    tagLink.classList.remove('active');

  /* END LOOP: for each active tag link */
  }

  /* find all tag links with "href" attribute equal to the "href" constant */
  const hrefTagLinks = document.querySelectorAll(href);

/* Im not sure about this one xd */

  /* START LOOP: for each found tag link */
  for(let hrefTagLink of hrefTagLinks){

    /* add class active */
    hrefTagLink.classList.add('active');

  /* END LOOP: for each found tag link */
  }

  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags(){
  /* find all links to tags */
  const tagLinks = document.querySelectorAll(optTagLinksSelector);

  /* START LOOP: for each link */
  for(let tagLink of tagLinks){

    /* add tagClickHandler as event listener for that link */
    tagLink.addEventListener('click', tagClickHandler);

  /* END LOOP: for each link */
  }
}

function generateAuthors(){

  let allAuthors = {};

/* articles selector */
 const articles = document.querySelectorAll(optArticleSelector);


 for(let article of articles) {
    /* authors wrapper */
 const authorList = article.querySelector(optAuthorsSelector);

let html = '';

/* get authors form data-author attribute */

const articleAuthor = article.getAttribute('data-author');

if (!allAuthors.hasOwnProperty(articleAuthor)){
  /* add generated code to allAuthors object */
 allAuthors[articleAuthor] =1;
 } else {
   allAuthors[articleAuthor]++;
 }

 console.log(allAuthors);


/* generate html of the link */
const linkHTMLData = {id:'author-' + articleAuthor, title:articleAuthor};
const linkHTML = templates.articleLink(linkHTMLData);

html += linkHTML;


/* insert links into author wrappers */
authorList.innerHTML =  html;


 }
 /* make authors visible on the right */

 let allAuthorsHTML = '';
 for (let articleAuthor in allAuthors){
   allAuthorsHTML += '<li><a href="#author-' + articleAuthor + '">' + articleAuthor + ' (' + allAuthors[articleAuthor] + ' articles) ' + '</a></li>';
 }
 const authorList = document.querySelector('.authors');
 authorList.innerHTML = allAuthorsHTML;

 const links = document.querySelectorAll('.post-authors');
 for (let link of links) {
  link.addEventListener('click',authorClickHandler);
}
  /* END of generateAUthors function */
}

function addClickListenersToAuthors(){

  const authorLinks = document.querySelectorAll(optAuthorsSelector);

  for (let authorLink of authorLinks){
    authorLink.addEventListener('click', authorClickHandler);
  }
}

function authorClickHandler(event) {
  /* prevent default action for this event */ 
  /*
  event.preventDefault();

  const clickedElement = this;
  console.log('clikedElement: ', clickedElement);

  const href = clickedElement.getAttribute('href');
  console.log(href);

  //const author = href.replace('#author-', '');

  const authorLinks = document.querySelectorAll('a[href="' + href + '"]');
  console.log(authorLinks);

  for(let authorLink of authorLinks){

   
    authorLink.classList.remove('active');
    */
   /*
  const hrefAuthorLinks = document.querySelectorAll(href);
  console.log(hrefAuthorLinks);

  for (let hrefAuthorLink of hrefAuthorLinks){
    hrefAuthorLink.classList.add('active');
  }
}*/

event.preventDefault();
const clickedElement = this;



/* [DONE] remove class 'active' from all article links  */

const activeLinks = document.querySelectorAll(optAuthorsSelector);

for(let activeLink of activeLinks){
  activeLink.classList.remove('active');
}

/* [DONE] add class 'active' to the clicked link */

console.log('clickedElement:', clickedElement);
const activeLink = this;
activeLink.classList.add('active');


/* [DONE] get 'href' attribute from the clicked link */

const articleSelector = clickedElement.getAttribute('href');
//console.log(articleSelector);

/* find the correct article using the selector (value of 'href' attribute) */

const targetArticle = document.querySelector(articleSelector);



}


addClickListenersToTags();

generateTags();

generateAuthors();

addClickListenersToAuthors();