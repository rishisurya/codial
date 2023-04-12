{
    // method to submit the form data for new post using Ajax
    let createPost = function(){
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type: 'post',
                url : "/posts/create",
                data:newPostForm.serialize(),
                success: function(data){
                    let newPost = newPostDom(data.data.post);
                    $('#post_feed>ul').prepend(newPost);
                    postDelete($(' .delete-post-button',newPost));
                // call the create comment class
                    new PostComments(data.data.post._id);

                    new Noty({
                        theme: 'relax',
                        text: "Post published!",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();
                
                
                },
                error:function(error){
                    console.log(error.responseText);
                }
            });
        });
    };


    //method to create post in DOM

    let newPostDom = function(post){
        return $(` <li id="post-${post._id}">
            <small>
                <a class="delete-post-button" href="/posts/destroy/${ post._id}">X</a>
            </small>
        <span> Name : ${ post.user.name }</span>
        <br>
        <span> Content: ${ post.content }</span>
    
        <div class="post-comments">
            <form action="/comments/create" method="post">
                <input type="text" name="content" placeholder="Enter Your Comment" required>
                <input type="hidden" name="post" value="${ post._id}">
                <input type="submit" value="Add Comment">
            </form>
        </div>
    
        <div class="post-comments-list">
            <h3>Comments</h3>
            <ul id="post=comments-${post._id}">
            </ul>
        </div>
    
    </li>`)
    }


    let postDelete = function(deletelink){
        $(deletelink).click(function(e){
            e.preventDefault();

            $.ajax({
                type:'get',
                url:$(deletelink).prop('href'),
                success:function(data){
                    $(`#post-${data.data.post_id}`).remove();
                   
                   
                    new Noty({
                        theme: 'relax',
                        text: "Post Deleted",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();
                
                },
                error:function(error){
                    console.log(error.responseText);
                }
            });
        });
    }
    // loop over all the existing posts on the page (when the window loads for the first time) and call the delete post method on delete link of each, also add AJAX (using the class we've created) to the delete button of each
    let convertPostsToAjax = function(){
        $('#post_feed>ul>li').each(function(){
            let self = $(this);
            let deleteButton = $(' .delete-post-button', self);
            deletePost(deleteButton);

            // get the post's id by splitting the id attribute
            let postId = self.prop('id').split("-")[1]
            new PostComments(postId);
        });
    }


    createPost();
    convertPostsToAjax();
}