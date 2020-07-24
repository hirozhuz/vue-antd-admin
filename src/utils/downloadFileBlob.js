export default function downloadFileBlob(res, type, filename) {
    const blob = new Blob([res], {
        type: type
    })

    const link = document.createElement('a')
    const herf = window.URL.createObjectURL(blob)
    // 下载链接
    link.href = herf
    // 下载文件名,如果后端没有返回，可以自己写a.download = '文件.pdf'
    link.download = filename
    link.click()
    window.URL.revokeObjectURL(herf)
}
