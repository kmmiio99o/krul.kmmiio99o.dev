import { Box, Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/navbar/Navbar";

export default function MainLayout() {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <Navbar />
      <Container maxWidth="md" sx={{ py: 6, mt: 4 }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Outlet />
        </motion.div>
      </Container>
    </Box>
  );
}
