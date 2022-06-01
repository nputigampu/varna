import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function PaginationControlled({ count, page, handleChange }) {
    return (
        <Stack spacing={2}>
            <Pagination
                count={count}
                page={page}
                onChange={handleChange}
                color="primary"
            />
        </Stack>
    );
}
