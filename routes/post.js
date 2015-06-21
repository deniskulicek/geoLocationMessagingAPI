var _post = require('../controllers/postController');

app.post('/posts', _post.list); //for sample posts sampleflag parameter is required
app.post('/posts/within', _post.within); //for sample posts sampleflag parameter is reqired

app.post('/posts/new', _post.post);