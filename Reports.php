<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Relatório</title>
  <link rel="stylesheet" href="./resources/css/geralStyle.css">
  <link rel="stylesheet" href="./resources/css/report.css">

</head>
<body id="p2">
  <?php include 'includes/menu.php'; ?>
  <div class="content-body">

    <div class="content-w-lateral" id="ctt-ltl-report">
      <aside class="">
        <i class="icon-menu"></i>
        <ul class="single" id="secondary-menu"></ul>
      </aside>
      <article class="article-report ">


        <div class="header-report">
          <h1 class="title-report">Clientes</h1>
          <div class="search-item">
            <input type="text">
            <i class="icon-search"></i>
          </div>
          <span class="funtionality">

           <i class="icon-file-pdf" title="Exportar para PDF"></i>
           <i class="icon-file-excel" title="Exportar para Excel"></i>
           <separator></separator>
           <i class="icon-filter callFilter"></i>
         </span>
       </div>
       <div class="report-content">


       </div>
       <div class="pagination flex h-ct" id="relatorio_pagination">
        <div class="icon-backward2">
        </div>
        <div id="relatorio_pagination-add" class="icon-forward3">
        </div>
      </div>

      <div id="log-rep-filter-form" class="filter-report xpert-form">
        <nav class="ctrls">
          <i class="x-icon-ok"></i>
          <span>
            <!-- <i id="log-rep-filter-pin" class="icon-pushpin pin"></i> -->
            <i id="log-rep-filter-hide" class="icon-arrow-right2 hide-filter"></i>
          </span>
        </nav>
        <div class="periodic show">

          <div class="prd-enabled">
            <input type="text" class="is-datepicker reportDate"
            placeholder="Data Inicial" id="report-inicial-date"/>
            <input type="text" class="is-datepicker reportDate" placeholder="Data Final"
            id="report-final-date">
            <p id="yerC"><span></span></p>

          </div>
        </div>
        <div class="add-section-filter">
          <select name="" id="report-entities">

            <option value="">(Selecione)</option>
          </select>
          <b></b>
        </div>
        <div class="filter-added">
          <nav> Filtro selecionado<i class="icon-ctrl show"></i></nav>
        </div>
      </div>

    </article>

  </div>
  <label id="exportData"></label>
</body>
<script type="text/javascript" src="./resources/fw/pikaday/pikaday.js"></script>
<script type="text/javascript" src="./resources/js/jQuery.js"></script>
<script type="text/javascript" src="resources/js/table.js"></script>
<script type="text/javascript" src="resources/js/geralScript.js"></script>
<script type="text/javascript" src="resources/js/controller/geral.js"></script>
<script type="text/javascript" src="resources/js/controller/logar.js"></script>
<script type="text/javascript" src="./resources/js/controller/menu.js"></script>
<script type="text/javascript" src="resources/js/report.js"></script>
<script type="text/javascript" src="resources/js/reports/report.js"></script>
<script type="text/javascript" src="resources/fw/firebase/firebase.js"></script>
<script type="text/javascript" src="resources/js/Base64/jquery.base64.js"></script>


</html>

