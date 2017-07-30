$(function () {
    $('#search').on('click', function () {
        name = $('#search-text').val();
        $("table").find('tbody').remove();
        $.post('/home/searchGitHub', { name: name }, function (result) {
            $('.name-header').css('display', 'block')
            $('.name').html(result.user.name);
            $('.location').html(result.user.location);
            $('.followers').html(result.user.followers);

            result.repo.forEach(repo => {
                var row = `<tr>
                            <td><a href="https://github.com/${name}/${repo.name}" target="_blank">${repo.name}</a></td>
                            <td>${repo.description}</td>
                            <td class="stargazers-sec">${repo.stargazers}</td>
                            <td class ="watchers-sec" >${repo.watchers}</td>
                            </tr>`;
                $("table").append(row);
            });
        });
    })

    $('.sort-btn').on('click', function () {
        var sortBy = $(this).attr('data-sort');
        var rowchange = $(this).attr('data-btn-type');
        var num = [];
        $('tr').find('.'+rowchange+'-sec').each(function (index, element) {
            num.push({
                key: $(this).text(),
                value: $(this).closest('tr').html()
            });
        });

        $(".sort-btn .glyphicon").css('display', 'none');
        $("."+rowchange+"-btn .glyphicon").css('display', 'block').toggleClass("glyphicon-sort-by-attributes glyphicon-sort-by-attributes-alt");

        if (sortBy == 'ASC') {
            num.sort(sortNumberASC);
            $(this).attr('data-sort', 'DESC')
        } else {
            num.sort(sortNumberDESC);
            $(this).attr('data-sort', 'ASC')
        }
        console.log(num)
        $('tbody').html('');
        $.each(num, function (key, value) {
            $('tbody').append('<tr>' + value.value + '</tr>')
        });
    })
})

function sortNumberASC(a, b) {
    return a.key - b.key;
}

function sortNumberDESC(a, b) {
    return b.key - a.key;
}
