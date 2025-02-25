<?php

$finder = PhpCsFixer\Finder::create()
    ->in(__DIR__) // Scan the backend directory
    ->exclude(['vendor', 'storage', 'node_modules', 'bootstrap']) // Exclude unnecessary folders
    ->notPath('server.php') // Optionally exclude specific files
    ->name('*.php') // Only check PHP files
    ->ignoreDotFiles(true)
    ->ignoreVCS(true);

return (new PhpCsFixer\Config())
    ->setRules([
        '@PSR12' => true, // Follow PSR-12 coding standard
        'array_syntax' => ['syntax' => 'short'], // Use short array syntax []
        'no_unused_imports' => true, // Remove unused imports
        'single_quote' => true, // Use single quotes where possible
        'trailing_comma_in_multiline' => ['elements' => ['arrays']], // Ensure trailing commas in multi-line arrays
        'no_extra_blank_lines' => true, // Remove extra blank lines
        'ordered_imports' => ['sort_algorithm' => 'alpha'], // Sort imports alphabetically
    ])
    ->setFinder($finder);
