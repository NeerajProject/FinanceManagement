import { useState } from 'react';
import {
    Search,
    Filter,
    Plus,
    Trash2,
    X,
} from 'lucide-react';

export default function SearchFilter({
    fields = [],
    onSearch,
    initialSearch = '',
    initialCondition = 'and',
    initialRules = null,
}) {
    const [keyword, setKeyword] =
        useState(initialSearch);

    const [showFilters, setShowFilters] =
        useState(!!(initialRules && Object.keys(initialRules).length > 0));

    const [condition, setCondition] =
        useState(initialCondition);

    // If initialRules is parsed from query string, it might be an array or an object (due to PHP array serialization in query params)
    const parsedRules = initialRules 
        ? (Array.isArray(initialRules) ? initialRules : Object.values(initialRules))
        : [];

    const [rules, setRules] = useState(
        parsedRules.length > 0
            ? parsedRules
            : [
                {
                    field:
                        fields?.[0]?.value || '',
                    operator: 'contains',
                    value: '',
                    value_to: '',
                },
            ]
    );

    const normalOperators = [
        {
            value: '=',
            label: 'Equals',
        },
        {
            value: '!=',
            label: 'Not Equal',
        },
        {
            value: 'contains',
            label: 'Contains',
        },
        {
            value: 'starts_with',
            label: 'Starts With',
        },
        {
            value: 'ends_with',
            label: 'Ends With',
        },
        {
            value: '>',
            label: 'Greater Than',
        },
        {
            value: '<',
            label: 'Less Than',
        },
    ];

    const dateOperators = [
        {
            value: 'between',
            label: 'Between',
        },
        {
            value: '=',
            label: 'On',
        },
        {
            value: '>',
            label: 'After',
        },
        {
            value: '<',
            label: 'Before',
        },
    ];

    const getField = (
        fieldName
    ) => {
        return fields.find(
            (field) =>
                field.value === fieldName
        );
    };

    const addRule = () => {
        setRules([
            ...rules,
            {
                field:
                    fields?.[0]?.value ||
                    '',
                operator:
                    'contains',
                value: '',
                value_to: '',
            },
        ]);
    };

    const removeRule = (index) => {
        setRules(
            rules.filter(
                (_, i) => i !== index
            )
        );
    };

    const updateRule = (
        index,
        key,
        value
    ) => {
        const copy = [...rules];

        copy[index][key] = value;

        setRules(copy);
    };

    const handleSearch = () => {
        onSearch({
            search: keyword,
            condition,
            filters: rules.filter(
                (rule) =>
                    rule.field &&
                    ((rule.value !== '' && rule.value !== undefined && rule.value !== null) ||
                     (rule.value_to !== '' && rule.value_to !== undefined && rule.value_to !== null))
            ),
        });
    };

    const clearFilters = () => {
        setKeyword('');

        setCondition('and');

        setRules([
            {
                field:
                    fields?.[0]?.value ||
                    '',
                operator:
                    'contains',
                value: '',
                value_to: '',
            },
        ]);

        onSearch({
            search: '',
            filters: [],
        });
    };

    return (
        <div className="bg-white border rounded-lg shadow-sm">

            {/* Toolbar */}

            <div className="p-4">

                <div className="flex flex-col lg:flex-row gap-3">

                    <div className="relative flex-1">

                        <Search
                            size={18}
                            className="
                                absolute
                                left-3
                                top-3
                                text-gray-400
                            "
                        />

                        <input
                            type="text"
                            value={keyword}
                            placeholder="Search..."
                            onChange={(e) =>
                                setKeyword(
                                    e.target.value
                                )
                            }
                            onKeyDown={(e) =>
                                e.key ===
                                    'Enter' &&
                                handleSearch()
                            }
                            className="
                                w-full
                                pl-10
                                pr-4
                                py-2
                                border
                                rounded-md
                            "
                        />

                    </div>

                    <button
                        type="button"
                        onClick={() =>
                            setShowFilters(
                                !showFilters
                            )
                        }
                        className="
                            flex
                            items-center
                            gap-2
                            border
                            px-4
                            py-2
                            rounded-md
                        "
                    >
                        <Filter size={18} />
                        Filters
                    </button>

                    <button
                        type="button"
                        onClick={
                            handleSearch
                        }
                        className="
                            bg-blue-600
                            text-white
                            px-5
                            py-2
                            rounded-md
                        "
                    >
                        Search
                    </button>

                </div>

            </div>

            {/* Filters */}

            {showFilters && (

                <div className="border-t bg-gray-50 p-5">

                    {/* Match */}

                    <div className="mb-5 flex items-center gap-3">

                        <span>
                            Match
                        </span>

                        <select
                            value={
                                condition
                            }
                            onChange={(e) =>
                                setCondition(
                                    e.target
                                        .value
                                )
                            }
                            className="
                                border
                                rounded
                                px-3
                                py-2
                            "
                        >
                            <option value="and">
                                All
                            </option>

                            <option value="or">
                                Any
                            </option>

                        </select>

                        <span>
                            conditions
                        </span>

                    </div>

                    {/* Rules */}

                    {rules.map(
                        (
                            rule,
                            index
                        ) => {
                            const field =
                                getField(
                                    rule.field
                                );

                            const operators =
                                field?.type ===
                                'date'
                                    ? dateOperators
                                    : normalOperators;

                            return (
                                <div
                                    key={
                                        index
                                    }
                                    className="
                                        grid
                                        grid-cols-12
                                        gap-3
                                        mb-3
                                    "
                                >

                                    {/* Field */}

                                    <select
                                        value={
                                            rule.field
                                        }
                                        onChange={(
                                            e
                                        ) =>
                                            updateRule(
                                                index,
                                                'field',
                                                e
                                                    .target
                                                    .value
                                            )
                                        }
                                        className="
                                            col-span-3
                                            border
                                            rounded
                                            px-3
                                            py-2
                                        "
                                    >
                                        {fields.map(
                                            (
                                                field
                                            ) => (
                                                <option
                                                    key={
                                                        field.value
                                                    }
                                                    value={
                                                        field.value
                                                    }
                                                >
                                                    {
                                                        field.label
                                                    }
                                                </option>
                                            )
                                        )}
                                    </select>

                                    {/* Operator */}

                                    <select
                                        value={
                                            rule.operator
                                        }
                                        onChange={(
                                            e
                                        ) =>
                                            updateRule(
                                                index,
                                                'operator',
                                                e
                                                    .target
                                                    .value
                                            )
                                        }
                                        className="
                                            col-span-3
                                            border
                                            rounded
                                            px-3
                                            py-2
                                        "
                                    >
                                        {operators.map(
                                            (
                                                operator
                                            ) => (
                                                <option
                                                    key={
                                                        operator.value
                                                    }
                                                    value={
                                                        operator.value
                                                    }
                                                >
                                                    {
                                                        operator.label
                                                    }
                                                </option>
                                            )
                                        )}
                                    </select>

                                    {/* Value */}

                                    <div className="col-span-5">

                                        {field?.type ===
                                        'select' ? (

                                            <select
                                                value={
                                                    rule.value
                                                }
                                                onChange={(
                                                    e
                                                ) =>
                                                    updateRule(
                                                        index,
                                                        'value',
                                                        e
                                                            .target
                                                            .value
                                                    )
                                                }
                                                className="
                                                    w-full
                                                    border
                                                    rounded
                                                    px-3
                                                    py-2
                                                "
                                            >
                                                <option value="">
                                                    Select
                                                </option>

                                                {field.options?.map(
                                                    (
                                                        option
                                                    ) => (
                                                        <option
                                                            key={
                                                                option.value
                                                            }
                                                            value={
                                                                option.value
                                                            }
                                                        >
                                                            {
                                                                option.label
                                                            }
                                                        </option>
                                                    )
                                                )}

                                            </select>

                                        ) : field?.type ===
                                          'date' ? (

                                            rule.operator ===
                                            'between' ? (

                                                <div className="flex gap-2">

                                                    <input
                                                        type="date"
                                                        value={
                                                            rule.value
                                                        }
                                                        onChange={(
                                                            e
                                                        ) =>
                                                            updateRule(
                                                                index,
                                                                'value',
                                                                e
                                                                    .target
                                                                    .value
                                                            )
                                                        }
                                                        className="
                                                            flex-1
                                                            border
                                                            rounded
                                                            px-3
                                                            py-2
                                                        "
                                                    />

                                                    <input
                                                        type="date"
                                                        value={
                                                            rule.value_to
                                                        }
                                                        onChange={(
                                                            e
                                                        ) =>
                                                            updateRule(
                                                                index,
                                                                'value_to',
                                                                e
                                                                    .target
                                                                    .value
                                                            )
                                                        }
                                                        className="
                                                            flex-1
                                                            border
                                                            rounded
                                                            px-3
                                                            py-2
                                                        "
                                                    />

                                                </div>

                                            ) : (

                                                <input
                                                    type="date"
                                                    value={
                                                        rule.value
                                                    }
                                                    onChange={(
                                                        e
                                                    ) =>
                                                        updateRule(
                                                            index,
                                                            'value',
                                                            e
                                                                .target
                                                                .value
                                                        )
                                                    }
                                                    className="
                                                        w-full
                                                        border
                                                        rounded
                                                        px-3
                                                        py-2
                                                    "
                                                />

                                            )

                                        ) : (

                                            <input
                                                type="text"
                                                value={
                                                    rule.value
                                                }
                                                onChange={(
                                                    e
                                                ) =>
                                                    updateRule(
                                                        index,
                                                        'value',
                                                        e
                                                            .target
                                                            .value
                                                    )
                                                }
                                                className="
                                                    w-full
                                                    border
                                                    rounded
                                                    px-3
                                                    py-2
                                                "
                                                placeholder="Value"
                                            />

                                        )}

                                    </div>

                                    {/* Delete */}

                                    <button
                                        type="button"
                                        onClick={() =>
                                            removeRule(
                                                index
                                            )
                                        }
                                        className="
                                            text-red-500
                                        "
                                    >
                                        <Trash2
                                            size={
                                                18
                                            }
                                        />
                                    </button>

                                </div>
                            );
                        }
                    )}

                    {/* Footer */}

                    <div className="flex gap-4 mt-5">

                        <button
                            type="button"
                            onClick={
                                addRule
                            }
                            className="
                                flex
                                items-center
                                gap-2
                                text-blue-600
                            "
                        >
                            <Plus size={16} />
                            Add Rule
                        </button>

                        <button
                            type="button"
                            onClick={
                                clearFilters
                            }
                            className="
                                flex
                                items-center
                                gap-2
                                text-gray-600
                            "
                        >
                            <X size={16} />
                            Clear
                        </button>

                    </div>

                </div>

            )}

        </div>
    );
}