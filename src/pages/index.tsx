import { Skeleton } from "~/components/ui/skeleton";
import { api } from "~/utils/api";

export default function Home() {
  const { data: products, isLoading } = api.product.getAll.useQuery();

  return (
    <div className="container mx-auto space-y-4 p-4">
      <h1 className="text-2xl font-bold">Stackfix</h1>
      <div className="space-y-4">
        {isLoading && (
          <>
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
          </>
        )}
        {products?.map((p) => (
          <div key={p.id} className="space-y-2 rounded-xl border p-2">
            <h2 className="text-lg font-semibold">{p.name}</h2>
            <p className="text-sm text-gray-500">{p.stackfixScore}/10</p>
          </div>
        ))}
      </div>
    </div>
  );
}
