trait HasFilters
{
    public function applyFilters(
        Builder $query,
        array $filters
    ): Builder {

        $condition =
            $filters['condition']
            ?? 'and';

        foreach (
            $filters['filters']
            ?? []
            as $filter
        ) {

            $field =
                $filter['field'];

            $operator =
                $filter['operator'];

            $value =
                $filter['value'];

            $method =
                $condition === 'or'
                ? 'orWhere'
                : 'where';

            match ($operator) {

                '=' =>
                    $query->{$method}(
                        $field,
                        $value
                    ),

                'contains' =>
                    $query->{$method}(
                        $field,
                        'like',
                        "%{$value}%"
                    ),

                'starts_with' =>
                    $query->{$method}(
                        $field,
                        'like',
                        "{$value}%"
                    ),

                'ends_with' =>
                    $query->{$method}(
                        $field,
                        'like',
                        "%{$value}"
                    ),

                default => null,
            };
        }

        return $query;
    }
}