$TestRecordingFile = Join-Path $PSScriptRoot 'Invoke-DatePathNull.Recording.json'
$currentPath = $PSScriptRoot
while(-not $mockingPath) {
    $mockingPath = Get-ChildItem -Path $currentPath -Recurse -Include 'HttpPipelineMocking.ps1' -File
    $currentPath = Split-Path -Path $currentPath -Parent
}
. ($mockingPath | Select-Object -First 1).FullName

Describe 'Invoke-DatePathNull' {
    It 'Date' -skip {
        { throw [System.NotImplementedException] } | Should -Not -Throw
    }

    It 'DateViaIdentity' -skip {
        { throw [System.NotImplementedException] } | Should -Not -Throw
    }
}
