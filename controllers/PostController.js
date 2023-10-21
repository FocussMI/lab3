import PostModule from "../models/Post.js";

export const index = async (req, res) => {
    try {
        const posts = await PostModule.find().populate('user').exec();

        res.json(posts);

    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: 'failed to create an post'
        })
    }
}
export const create = async (req, res) => {
    try {
        const doc = new PostModule({
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags,
            user: req.userId,
        });

        const post = await doc.save();

        res.json(post)
    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: 'failed to create an post'
        })
    }
}
export const show = async (req, res) => {
    try {
        const postId = req.params.id;

        PostModule.findOneAndUpdate({
                _id: postId,
            },
            {
                $inc: {viewsCount: 1}
            },
            {
                returnDocument: 'after'
            }).then(doc => {
            if (!doc) {
                return res.status(404).json({
                    message: "post not found2"
                });
            }

            return res.json(doc);
        }).catch(e => {
            if (e) {
                console.log(e);
                return res.status(500).json({
                    message: 'failed to create an post1'
                });
            }
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: 'failed to create an post3'
        })
    }
}
export const update = async (req, res) => {
    try {
        const postId = req.params.id;

        await PostModule.updateOne(
            {
                _id: postId,
            },
            {
                title: req.body.title,
                text: req.body.text,
                imageUrl: req.body.imageUrl,
                user: req.body.userId,
                tags: req.body.tags,
            },
        );

        res.json(
            {
                success: true
            }
        );
    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: 'failed to update on post'
        })
    }
}
export const destroy = async (req, res) => {
    try {
        const postId = req.params.id;

        PostModule.findOneAndDelete(
            {
                _id: postId,
            }
        )
            .then(doc => {
                    if (!doc) {
                        return res.status(404).json({
                            message: "post not found2"
                        });
                    }
                    return res.json(
                        {
                            success: true
                        }
                    )
                }
            )
            .catch(e => {
                if (e) {
                    console.log(e);
                    return res.status(500).json({
                        message: 'failed to delete post'
                    })
                }
            });

    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: 'failed to create an post'
        })
    }
}