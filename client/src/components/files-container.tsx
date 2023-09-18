const FilesContainer = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <h3 className="mb-3 font-medium select-none">Files</h3>

            <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {children}
            </div>
        </>
    );
};

export default FilesContainer;
