const FoldersContainer = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="px-5 max-w-[1200px] mx-auto gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {children}
        </div>
    );
};

export default FoldersContainer;
