import { memo } from 'react'
import HtmlParser from 'react-html-parser'
import oc from 'open-color'
import moment from 'moment'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'

function CommentItemComponent(props) {
    const { comment_id, name, content, wdate, myComments, onRemove } = props

    return (
        <Box style={{ display: 'flex', gap: 20, marginTop: 20 }}>
            <div>
                <Box style={{ borderRadius: 20, background: oc.green[3], fontSize: 11, padding: 8 }}>
                    {name}
                </Box>
            </div>
            <div style={{ flex: 1 }}>
                <Typography variant="caption" color="textSecondary" component="div"  style={{ fontSize: 9 }}>{moment(wdate).calendar()}</Typography> 
                <Typography variant="body2" style={{ fontSize: 14 }}>{HtmlParser(content.replaceAll('\n', '<br />'))}</Typography>
            </div>
            <div>
                {
                    myComments.includes(comment_id) && (
                        <IconButton size="small" onClick={() => onRemove(comment_id)}>
                            <DeleteIcon fontSize="small" color="action" />
                        </IconButton>
                    )
                }
            </div>
        </Box>
    )
}

export default memo(CommentItemComponent)