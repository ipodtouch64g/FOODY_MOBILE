// Develop server URL
// const postBaseUrl = 'http://localhost:3000/api';

// Staging server URL
// const postBaseUrl = 'http://weathermood-staging.us-west-2.elasticbeanstalk.com/api';

// Production server URL
const postBaseUrl = 'http://weathermood-production.us-west-2.elasticbeanstalk.com/api';
const postBaseUrl_foody = 'https://foody.us-west-2.elasticbeanstalk.com/api';
export function listPosts(searchText = '', start) {
    let url = `${postBaseUrl}/posts`;
    let query = [];
    if (searchText)
        query.push(`searchText=${searchText}`);
    if (start)
        query.push(`start=${start}`);
    if (query.length)
        url += '?' + query.join('&');

    console.log(`Making GET request to: ${url}`);

    return fetch(url, {
        headers: {
            'Accept': 'application/json'
        }
    }).then(res => {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);

        return res.json();
    });
}

export function createPost(mood, text) {
    let url = `${postBaseUrl}/posts`;

    console.log(`Making POST request to: ${url}`);

    return fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            mood,
            text
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
export function searchFoodyFromApi(lat= 24.7947253,lng=120.9932316,dist=1,limit=15,food) {
    let url = `${postBaseUrl_foody}/foody`;
    url += `?lat=${lat}&lng=${lng}`;

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
    let url = `${postBaseUrl_url}/rests`;
    let query = [];
    if (searchText)
        query.push(`searchText=${searchText}`);
    if (place)
        query.push(`place=${place}`);
    if (category)
        query.push(`category=${category}`);
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

    return axios.get(url).then(function(res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);
        return res.data;
    });
}
