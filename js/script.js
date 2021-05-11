'use strict';

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

  console.log('clickedElement:', clickedElement);
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
  optAuthorsSelector = '.post-author';

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

    const linktHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    //console.log(linktHTML);

    /* insert link into titleList */

    html = html + linktHTML;
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

function generateTags(){
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);

  /* START LOOP: for every article: */
  for (let article of articles){

    /* find tags wrapper */
    const tagList = article.querySelector(optArticleTagsSelector);
    console.log(tagList);

    /* make html variable with empty string */
    let html = '';

    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    //console.log(articleTags);

    /* split tags into array */
    const articleTagsArray = articleTags.split(' ') + ' ';
    //console.log(articleTagsArray);

    /* START LOOP: for each tag */
    for(let tag of articleTagsArray){
     // console.log(tag);

      /* generate HTML of the link */
      const linktHTML = '<li><a href="#tag-' + tag + '"><span>' + tag + '</span></a></li>';

      /* add generated code to html variable */
      html += linktHTML;
     // console.log(html);

    /* END LOOP: for each tag */
    }

    /* insert HTML of all the links into the tags wrapper */
    tagList.innerHTML = html;

  /* END LOOP: for every article: */
  }
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
  console.log(hrefTagLinks);
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
  /* find all authors */
/*const authors = document.querySelector(optAuthorsSelector);
console.log(authors);

   // const articles = document.querySelectorAll(optArticleSelector);
  const articleAuthors = document.getAttribute('data-author');
  console.log(articleAuthors);
 let html ='';
 const linkHTML = '<a href=#author-' + author + '>' + author + '</a>';
 console.log(linkHTML);
 html += linkHTML;
 authors.innerHTML = html; */

/* articles selector */
 const articles = document.querySelectorAll(optArticleSelector);


 for(let article of articles) {
    /* authors wrapper */
 const authorList = article.querySelectorAll(optAuthorsSelector);
console.log(authorList);

let html = '';

/* get authors form data-author attribute */

const articleAuthor = article.getAttribute('data-author');
console.log(articleAuthor);

/* generate html of the link */
const linkHTML = '<a href="author-' + articleAuthor + '">' + articleAuthor + '</a>';

html += linkHTML;

/* insert links into author wrappers */
authorList.innerHTML = html;

 }



}

addClickListenersToTags();

generateTags();

generateAuthors();