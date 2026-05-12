using Microsoft.EntityFrameworkCore;

namespace DatingAPI.Helpers;

public class PaginatedResult<T>
{
    public IReadOnlyList<T> Items { get; init; }
    public int TotalCount { get; init; }
    public int PageNumber { get; init; }
    public int PageSize { get; init; }
    public int TotalPages => (int)Math.Ceiling(TotalCount / (double)PageSize);
    public bool HasPreviousPage => PageNumber > 1;
    public bool HasNextPage => PageNumber < TotalPages;

    private PaginatedResult(IReadOnlyList<T> items, int totalCount, int pageNumber, int pageSize)
    {
        Items = items;
        TotalCount = totalCount;
        PageNumber = pageNumber;
        PageSize = pageSize;
    }

    /// <summary>
    /// Creates a PaginatedResult by executing a database query with pagination applied.
    /// </summary>
    public static async Task<PaginatedResult<T>> CreateAsync(
        IQueryable<T> source,
        int pageNumber,
        int pageSize,
        CancellationToken cancellationToken = default)
    {
        var totalCount = await source.CountAsync(cancellationToken);

        var items = await source
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync(cancellationToken);

        return new PaginatedResult<T>(items, totalCount, pageNumber, pageSize);
    }

    /// <summary>
    /// Creates a PaginatedResult from an already-materialized in-memory list.
    /// </summary>
    public static PaginatedResult<T> Create(
        IEnumerable<T> source,
        int pageNumber,
        int pageSize)
    {
        var list = source.ToList();
        var totalCount = list.Count;

        var items = list
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .ToList();

        return new PaginatedResult<T>(items, totalCount, pageNumber, pageSize);
    }
}
