// Develop server URL
// const postBaseUrl = 'http://localhost:3000/api';

// Staging server URL
// const postBaseUrl = 'http://weathermood-staging.us-west-2.elasticbeanstalk.com/api';

// Production server URL
const postBaseUrl = 'http://weathermood-production.us-west-2.elasticbeanstalk.com/api';
const postBaseUrl_foody = 'https://foody.us-west-2.elasticbeanstalk.com/api';

export function listCommentsFromApi(r_id = 0) {
    let url = `${postBaseUrl_foody}/posts`;
    let query;
    query =`r_id=${r_id}`;
    url += '?' + query;

    console.log(`Making GET request to: ${url}`);
    return fetch(url, {
          headers: {
              'Accept': 'application/json'
          }
      }).then(function(res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);
        console.log(res);
        return res.json();
    });

}

export function createCommentsFromApi(text,id,u_id="訪客",img='-1') {
    let url = `${postBaseUrl_foody}/posts`;

    console.log(`Making POST request to: ${url}`);
    console.log("UID?",u_id,"IMG?",img);

    return fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text,
          id,
          u_id,
          img
        })
    }).then(function(res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);

        return res.json();
    });

}

export function createVote(id, mood) {
    let url = `${postBaseUrl}/posts/${id}/${mood.toLowerCase()}Votes`;

    console.log(`Making POST request to: ${url}`);

    return fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json'
        }
    }).then(function(res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);

        return res.json();
    });
}
export function searchFoodyFromApi(lat= 24.7947253,lng=120.9932316,dis=1,limit=15,category="") {
    let url = `${postBaseUrl_foody}/foody`;
    url += `?lat=${lat}&lng=${lng}&distance=${dis}&limit=${limit}`;
    let q=[];
    if(category.size){
      q=Array.from(category);
      url +=`&category=${q.join('|')}`;
    }

    console.log(`Making GET request to: ${url}`);

    return fetch(url, {
          headers: {
              'Accept': 'application/json'
          }
      }).then(function(res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);
        console.log(res);
        return res.json();
    });
}
export function searchListFromApi(searchText = '',place = '',category = '', price = 0, ascending = 'no',start={}) {
    let url = `${postBaseUrl_foody}/rests`;
    let query = [];
    if (searchText)
        query.push(`searchText=${searchText}`);
    if (place)
        query.push(`place=${place}`);
    let q=[];
    if(category.size){
      q=Array.from(category);
      query.push(`&category=${q.join('|')}`);
    }
    if (price !== 0)
        query.push(`price=${price}`);
    if(Object.keys(start).length){
        query.push(`start_id=${start.id}`);
        query.push(`start_average=${start.average}`);
      }
    query.push(`ascending=${ascending}`);
    if(query.length)
      url += '?' + query.join('&');

    console.log(`Making GET request to: ${url}`);

    return fetch(url, {
          headers: {
              'Accept': 'application/json'
          }
      }).then(function(res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);
        console.log(res);
        return res.json();
    });
}
