using System;
using System.Threading.Tasks;

namespace Core.Interfaces
{
    public interface IResponsecacheService
    {
        Task CacheResponseAsync(string cacheKey, object response, TimeSpan timeToLive);
        Task<string> GetCachedResponse(string cacheKey);
    }
}