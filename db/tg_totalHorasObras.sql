declare tmp integer :=0 ;
BEGIN
	select id into tmp from cierre_proyectista where anno=new.anno AND mes=new.mes AND "SubProyectoId"=new."SubProyectoId";
	
	IF tmp!=0 then
		INSERT INTO public.cierre_proyectista(
			id, anno, mes, acumulado_obras, "SubProyectoId", "TrabajadorId")
			VALUES (default, new.anno, new.mes, new.acumulado_obras, new."SubProyectoId", new."TrabajadorId");
	ELSE 
		UPDATE public.cierre_proyectista
		SET  acumulado_obras=acumulado_obras + new.tiempo
		WHERE id=new.id;
	END If;
END;
