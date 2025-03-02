export default async function SearchPage({ searchParams }: { searchParams: { query: string } }) {
    const { query } = searchParams;
    
    return (
        <div>
            Search page for: {query}
        </div>
    );
}
