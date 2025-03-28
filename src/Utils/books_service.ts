import axios from "axios";

export const fetchBookRecommendations = async (bookTitle: string): Promise<string[]> => {
    try {
        const response = await axios.post("https://node56.cs.colman.ac.il/books/recommend", { bookTitle });
        return response.data.recommendations;
    } catch (error) {
        console.error("Error fetching book recommendations:", error);
        return ["No recommendations found."];
    }
};