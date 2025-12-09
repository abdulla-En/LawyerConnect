using System.Collections.Concurrent;

namespace LawyerConnect.Middlewares
{
    public class RateLimitingMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly int _limit;
        private readonly TimeSpan _window;
        private static readonly ConcurrentDictionary<string, List<DateTime>> Requests = new();

        public RateLimitingMiddleware(RequestDelegate next, IConfiguration config)
        {
            _next = next;
            _limit = config.GetValue<int>("RateLimiting:Limit", 5);
            var windowSeconds = config.GetValue<int>("RateLimiting:WindowSeconds", 60);
            _window = TimeSpan.FromSeconds(windowSeconds);
        }

        public async Task InvokeAsync(HttpContext context)
        {
            var key = $"{context.Connection.RemoteIpAddress}-{context.Request.Path.Value}".ToLowerInvariant();
            var now = DateTime.UtcNow;

            var entries = Requests.GetOrAdd(key, _ => new List<DateTime>());

            lock (entries)
            {
                entries.RemoveAll(t => t <= now - _window);
                if (entries.Count >= _limit)
                {
                    var reset = entries.First() + _window;
                    context.Response.StatusCode = StatusCodes.Status429TooManyRequests;
                    context.Response.Headers["X-RateLimit-Limit"] = _limit.ToString();
                    context.Response.Headers["X-RateLimit-Remaining"] = "0";
                    context.Response.Headers["X-RateLimit-Reset"] = ((long)(reset - now).TotalSeconds).ToString();
                    return;
                }
                entries.Add(now);
                context.Response.Headers["X-RateLimit-Limit"] = _limit.ToString();
                context.Response.Headers["X-RateLimit-Remaining"] = (_limit - entries.Count).ToString();
                context.Response.Headers["X-RateLimit-Reset"] = ((long)_window.TotalSeconds).ToString();
            }

            await _next(context);
        }
    }
}

