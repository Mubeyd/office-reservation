import Button from "@mui/material/Button"
import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import Typography from "@mui/material/Typography"
import { useCallback } from "react"
import { Link } from "react-router-dom"
import { IOffice } from "../../database/IOffice"

interface Props {
    item: IOffice
    onClick: (item: IOffice) => void
}

export default function MediaCard(props: Props) {
    const { item, onClick } = props
    
    const onSelect = useCallback(() => {
        onClick(item)
    }, [item, onClick])

    return (
        <Card sx={{ maxWidth: 345, margin: 4 }}>
            <CardMedia component="img" height="140" src={item.imageUrl} alt="green iguana" />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {item.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {item.description}
                </Typography>
            </CardContent>
            <CardActions>
                <Button onClick={onSelect} size="small">
                    <Link to={`${item.id}`}>Reserve</Link>
                </Button>
                <Typography gutterBottom variant="body2" color="text.secondary">
                    Price: {item.price}
                </Typography>
            </CardActions>
        </Card>
    )
}
