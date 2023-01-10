import { Card, CardActionArea, CardContent, Divider, Rating, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

const ReviewCard = ({ review }) => {
    return (
       <>
            <Card sx={{
                maxWidth: 300, mb: 4,
                transition: "1s",
                "&:hover": {
                    transform: "scale3d(0.85, 0.85, 1)",
                },
            }} key={review._id} >
                <CardActionArea
                >
                    <CardContent>
                        <Divider />
                        <Typography gutterBottom variant="h5" component="div">
                            {review.name}
                        </Typography>
                        <Divider />
                        <Divider />
                        <Typography variant="h6" color="text.secondary">
                            {review.comment}
                        </Typography>
                        <Rating name="read-only" value={review?.rating} readOnly />
                    </CardContent>
                </CardActionArea>

            </Card>
        </>
    )
}

export default ReviewCard