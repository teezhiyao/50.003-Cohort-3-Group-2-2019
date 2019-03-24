
import './PostActions';
import { fetchPosts, deletePostRequest, fetchReply } from './PostActions';
import { exportAllDeclaration } from '@babel/types';

const testPost = {
    username: 'Caleb',
    category: 'testing',
    resolveStatus: false,
    title: 'test title',
    content: 'test content',
    cuid: 123,
    replyDataStructure: {}
}

test('return correct type for addPost', ()=>{
    expect(addPost(testPost).type).toBe("ADD_POST");
}






/*
// Testing CRUD functions with database

// test addPostRequest and fetchPost
test('addPostRequest can execute without issue', () =>{
    return addPostRequest({
        post: {
            username: 'Caleb',
            category: 'testing',
            resolveStatus: false,
            title: 'untitled',
            content: 'testing',
            cuid: 123,
            replyDataStructure: {}
        }
    }).then(
        fetchPost(123).then( post => {
            expect(post.username).toBe('Caleb');
        })
    )
});

// test fetchPosts
test('fetchPosts can work', async () =>{
    expect.assertions(1);
    const data = await fetchPosts();
    expect(data).not.toBeNull();
});

//test addPostRequest and deletePost
test('deletePost can work', async () =>{
    expect.assertions(1);
    addPostRequest({
        post: {
            username: 'Caleb',
            category: 'testing',
            resolveStatus: false,
            title: 'untitled',
            content: 'testing',
            cuid: 123,
            replyDataStructure: {}
        }
    }).then(
        deletePostRequest(123).then( 
            fetchPosts().then( posts =>{
                expect([posts]).toBeNull();
            })     
        )
    )
});

// test addReplyRequest and fetchReply
test('addReplyRequest can execute without issue', () =>{
    addReplyRequest({
        reply: {
            reply: 'thank you',
            cuid: 321
        }
    }).then(
        fetchReply(321).then( reply => {
            expect(reply.cuid).toBe(321);
        })
    )
});
*/
