"use client";

import Table from "@/components/Table/Table";

const Page = () => {
  console.log("xd");
  return (
    <div className="w-full">
      <Table
        data={[
            {
                title: "example"
            }
        ]}
        title="Ejemplo tabla"
        cols={[
          {
            title: "Title 1",
            icon: null,
            key: "title",
          },
        ]}
      />
      <h1>Pagina Admin</h1>
    </div>
  );
};

export default Page;
